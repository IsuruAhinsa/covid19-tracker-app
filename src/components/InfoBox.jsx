import { Card, CardContent, Typography } from "@mui/material";
import numeral from "numeral";
import React from "react";

const InfoBox = ({ title, cases, total, ...props }) => {
	return (
		<Card
			onClick={props.onClick}
			sx={{ minWidth: 250, mr: 5, cursor: "pointer" }}
			variant="outlined"
		>
			<CardContent>
				<Typography
					sx={{ textAlign: "right" }}
					variant="h6"
					component={"div"}
					color="text.secondary"
				>
					{title}
				</Typography>
				<Typography
					sx={{ textAlign: "center", fontWeight: 700 }}
					variant="h2"
					component={"div"}
				>
					{numeral(cases).format("0,0")}
				</Typography>
				<Typography
					sx={{ textAlign: "center" }}
					variant="h5"
					component={"div"}
					color="text.secondary"
				>
					{numeral(total).format("0,0")} Total
				</Typography>
			</CardContent>
		</Card>
	);
};

export default InfoBox;
