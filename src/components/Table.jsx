import numeral from "numeral";
import React from "react";
import "./Table.css";

const Table = ({ countries }) => {
	return (
		<div className="table-wrapper">
			<table>
				<thead>
					{countries.map(({ country, cases }, index) => (
						<tr key={index}>
							<td>{country}</td>
							<td>{numeral(cases).format("0,0")}</td>
						</tr>
					))}
				</thead>
			</table>
		</div>
	);
};

export default Table;
