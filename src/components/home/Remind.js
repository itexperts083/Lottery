import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import PopupModal from "../PopupModal"
import axios from 'axios';
import { askForPermissioToReceiveNotifications } from '../push-notification';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        position: "fixed",
        width: "100%",
        left: 0,
        bottom: 0,
        padding: 0,
        margin: 0,
    },
    Container: {
        display: "flex",
        maxWidth: 750,
        margin: "auto",
        padding: 0,
    },
    reminderContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0.5rem",
        color: "#fcc43e",
        backgroundColor: "#262d31",
        // borderTop: "1px solid #F5C65A",
        [theme.breakpoints.down("sm")]: {
            padding: "1rem",
        },
        "&:hover": {
            cursor: "pointer",
        },
    },
    h4: {
        marginLeft: "3rem",
        fontFamily: "Open Sans",
        fontWeight: 700,
        [theme.breakpoints.down("sm")]: {
            marginLeft: "1rem",
            fontSize: "1rem",
        },
    },
    reminder: {
        width: "2rem",
        [theme.breakpoints.down("sm")]: {
            width: "1rem",
        },
    },
    updateIcon: {
        width: "2rem",
        [theme.breakpoints.down("sm")]: {
            width: "1.5rem",
        },
        [theme.breakpoints.down("xs")]: {
            width: "1.2rem",
        },
    },
    updateIconContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0.5rem",
        backgroundColor: "#fcc43e",
        [theme.breakpoints.down("sm")]: {
            width: "4rem",
            // height: "4rem",
        },
    },
}))

const Remind = ({ popup }) => {
    const classes = useStyles()

    const get_init_value = () => {
        if (localStorage.getItem("reminder_state"))
        {
            return JSON.parse(localStorage.getItem("reminder_state"))
        }
        else
        {
            let value = {
                "Quiniela: Todos":false,
                "Quiniela: Primera":false,
                "Quiniela: Matutina":false,
                "Quiniela: Vespertina":false,
                "Quiniela: Nocturna":false,
            }
            return value
        }
    }


    const [modal, setModal] = useState(false)
    const [subscribeData, setSubscribeData] = useState( get_init_value())
    const [modalValue, setModalValue] = useState("Notify Me")

    useEffect(() => {
        popup && modal ? setModalValue("Save") : setModalValue("Notify Me")
    }, [])

    const openModal = () => {



        if (modalValue === "Save")
        {
            localStorage.setItem("reminder_state", JSON.stringify(subscribeData))
            askForPermissioToReceiveNotifications()
        }

        setModal(!modal)
        popup
            ? modal
            ? setModalValue("Notify Me")
            : setModalValue("Save")
            : setModalValue("Notify Me")
    }

    const refreshPage = () => {
        console.log("refreshing page")
        if (typeof window !== "undefined") {
            window.location.reload(false)
        }
    }

    const saveSubscription = () => {
        // console.log("in saveSubscription")
        // localStorage.setItem("reminder_state", JSON.stringify(subscribeData))
        // askForPermissioToReceiveNotifications()



        // console.log(modalValue)

        // localStorage.setItem("reminder_state", JSON.stringify(subscribeData))


        // if(modalValue === "Save") {
        //     console.log("Save")
        //     // let categories = []
        //     // Object.keys(subscribeData).map((key, i) => {
        //     //     console.log(key, subscribeData[key])
        //     //     if(subscribeData[key] === true)
        //     //         categories.push(i);
        //     // })
        //
        //     // axios.post('http://199.201.89.17:5000/subscribe', {
        //     //     token: localStorage.getItem('firebase_token'),
        //     //     categories: categories,
        //     // });
        // }
    }

    const data = useStaticQuery(graphql`
    query {
      remindMeIcon: file(relativePath: { eq: "remindmeicon.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
      updateIcon: file(relativePath: { eq: "updateicon.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
  `)
    return (
        <div className={classes.root} style={{ zIndex: 100 }}>
            {popup && modal && (
                <div className={classes.Container}>
                    <Grid item xs={10} sm={10} md={10} lg={10}>
                        <PopupModal subscribeData={subscribeData} setSubscribeData={setSubscribeData} close={openModal} />
                    </Grid>
                </div>
            )}

            <div className={classes.Container}>
                <Grid item xs={10} sm={10} md={10} lg={10} onClick={() => openModal()}>
                    <div
                        className={classes.reminderContainer}
                        style={{ borderTop: modal && popup ? "2px solid #F5C65A" : null }}
                    >
                        <Img
                            fluid={data.remindMeIcon.childImageSharp.fluid}
                            className={classes.reminder}
                            fadeIn={false}
                            backgroundColor={"#262D31"}
                            alt="Notificarme"
                        />
                        <Typography variant="h4" component="h4" className={classes.h4} onClick={(e) => saveSubscription()}>
                            {modalValue.toUpperCase()}
                        </Typography>
                    </div>
                </Grid>
                <Grid
                    item
                    xs={2}
                    sm={2}
                    md={2}
                    lg={2}
                    className={classes.updateIconContainer}
                    onClick={() => refreshPage()}
                >
                    <Img
                        fluid={data.updateIcon.childImageSharp.fluid}
                        className={classes.updateIcon}
                        fadeIn={false}
                        backgroundColor={"#FCC43D"}
                        alt="Actualizar de quinielas"
                    />
                </Grid>
            </div>
        </div>
    )
}

export default Remind
