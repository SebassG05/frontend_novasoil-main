

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Welcome.module.css';
import logoNovasoil from '../../assets/images/logonovasoil.png';
import { CheckCircleRounded, PublicRounded } from '@mui/icons-material';
import { green, lightGreen } from '@mui/material/colors';

const Welcome = ({ visible, onClose }) => (
    <AnimatePresence>
        {visible && (
            <motion.div
                className={styles.backdrop}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    className={styles.container}
                    initial={{ y: 60, opacity: 0, scale: 0.95 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 40, opacity: 0, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 60, damping: 18 }}
                >
                    <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar bienvenida">×</button>
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.7rem',
                        padding: '0 0.5rem',
                    }}>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '0.2rem' }}>
                            <img src={logoNovasoil} alt="Novasoil Logo" style={{width: 120, height: 80, objectFit: 'contain'}} />
                        </div>
                        <motion.h1
                            style={{
                                fontSize: '2.1rem',
                                fontWeight: 900,
                                background: 'linear-gradient(90deg,#43c97f 10%,#a3e6b4 90%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                letterSpacing: '0.01em',
                                margin: 0,
                                textAlign: 'center',
                                textShadow: '0 2px 0px #5f8822',
                                lineHeight: 1.1,
                                marginBottom: '0.5rem',
                            }}
                            animate={{
                                backgroundPosition: [
                                    '0% 50%',
                                    '100% 50%',
                                    '0% 50%'
                                ]
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 7,
                                ease: 'linear',
                                repeatType: 'loop'
                            }}
                        >
                            Welcome to the NOVASOIL Geovisor
                        </motion.h1>
                        <motion.p
                            style={{
                                color: green[700],
                                fontWeight: 500,
                                fontSize: '1.13rem',
                                margin: 0,
                                textAlign: 'center',
                                maxWidth: 540,
                                lineHeight: 1.5,
                                background: 'rgba(255,255,255,0.93)',
                                borderRadius: '1rem',
                                padding: '1.1rem 1.3rem',
                                boxShadow: `0 2px 8px #ecc896` ,
                                textAlign: 'justify',
                                marginBottom: '1.1rem',
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.7 }}
                        >

                            Here you can see some of the soil data generated during the project, as well as its case studies and a brief summary of each of them.<br/><br/>
                            At  NOVASOIL we ensure soil science <b style={{color:green[600]}}>open-access</b> and free for all. You will find the main soil health indicators that we adopted within the project, along with a detailed explanation of each one.
                        </motion.p>
                        <div style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '1.2rem',
                            marginTop: '0.2rem',
                        }}>
                        </div>

                        <div style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '1.2rem',
                            marginTop: '-1rem',
                        }}>
                            <a
                                href="https://novasoil-project.eu/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-block',
                                    width: 38,
                                    height: 38,
                                    borderRadius: '50%',
                                    background: `linear-gradient(135deg,${green[600]} 60%,${lightGreen[400]} 100%)`,
                                    boxShadow: `0 2px 8px ${green[400]}cc`,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#fff',
                                    fontSize: 22,
                                    fontWeight: 700,
                                    letterSpacing: '-0.03em',
                                    border: '2px solid #fff',
                                    textDecoration: 'none',
                                    display: 'flex',
                                    transition: 'box-shadow 0.2s',
                                    cursor: 'pointer'
                                }}
                                aria-label="Ir al sitio web de NOVASOIL"
                            >
                                <PublicRounded fontSize="inherit" />
                            </a>                 
                       </div>
                    </div>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
);

export default Welcome;
