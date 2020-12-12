import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "../../stylesheets/DataPanel/DataPanelStyles";
import clsx from "clsx";

import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

function DataPanel(props) {
	const { classes, toggleDataPanel, dataPanel } = props;
	return (
		<div className={classes.root}>
			<CssBaseline />
			{dataPanel ? (
				<div>
					<Drawer
						className={classes.drawer}
						variant="permanent"
						anchor="right"
						classes={{
							paper: classes.drawerPaper,
						}}
					>
						<div className={classes.drawerContainer}>
							<List>
								{["Inbox", "Starred", "Send email", "Drafts"].map(
									(text, index) => (
										<ListItem button key={text}>
											<ListItemIcon>
												{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
											</ListItemIcon>
											<ListItemText primary={text} />
										</ListItem>
									)
								)}
							</List>
							<Divider />
							<List>
								{["All mail", "Trash", "Spam"].map((text, index) => (
									<ListItem button key={text}>
										<ListItemIcon>
											{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
										</ListItemIcon>
										<ListItemText primary={text} />
									</ListItem>
								))}
							</List>
						</div>
					</Drawer>
                    <div
					className={clsx(classes.chevronBtn, {
						[classes.shiftBtn]: dataPanel,
					})}
				>
					<button onClick={toggleDataPanel}>
						<ChevronRightIcon />
					</button>
				</div>
				</div>
			) : (
				<div
					className={clsx(classes.chevronBtn, {
						[classes.shiftBtn]: dataPanel,
					})}
				>
					<button onClick={toggleDataPanel}>
						<ChevronLeftIcon />
					</button>
				</div>
			)}
		</div>
	);
}
export default withStyles(styles, { withThem: true })(DataPanel);
