import React from "react";
import "./Loading.css";

const Loading: React.FC = () => {
	return (
		<div id="load-wrapp">
			<div className="load-1">
				<p>Loading</p>
				<div className="line"></div>
				<div className="line"></div>
				<div className="line"></div>
			</div>
		</div>
	);
};

export default Loading;
