import React, {useState} from 'react';
import CanvasComponent from "./components/CanvasComponent";
import Canvas from "./models/Canvas";
import CollapseButton from "./components/CollapseButton";

function App() {
	const [canvas, setCanvas] = useState(new Canvas());

	return (
		<div className="App">
			<CanvasComponent canvas={canvas} />
			<CollapseButton onClick={canvas.collapse.bind(canvas)}/>
		</div>
	);
}

export default App;
