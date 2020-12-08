import React from 'react'
import {withStyles} from '@material-ui/styles'
import styles from '../stylesheets/HeaderStyles'

function Header(props) {
    const {classes} = props
    return (
        <div>
            <section className={classes.header}>
                <h1>
                    Weather Impact
                </h1>
            </section>
        </div>
    )
}

export default withStyles(styles) (Header);
