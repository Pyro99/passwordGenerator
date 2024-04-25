import { useCallback, useEffect, useState, useRef } from 'react';

function App() {
	const [length, setLength] = useState(8);
	const [allowNumber, setAllowNumber] = useState(false);
	const [allowChar, setAllowChar] = useState(false);
	const [password, setPassword] = useState('');

	const passwordRef = useRef(null);

	const passwordGenerator = useCallback(() => {
		let pass = '';
		let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

		if (allowNumber) str += '0123456789';
		if (allowChar) str += '!@#$%^&*<>~_-';

		for (let i = 1; i <= length; i++) {
			let char = Math.floor(Math.random() * str.length + 1);
			pass += str.charAt(char);
		}

		setPassword(pass);
	}, [length, allowNumber, allowChar, setPassword]);

	useEffect(() => {
		passwordGenerator();
	}, [length, allowNumber, allowChar, passwordGenerator]);

	const copyPasswordToClipboard = () => {
		passwordRef.current?.select();
		passwordRef.current?.setSelectionRange(0, 50);
		window.navigator.clipboard.writeText(password);
	};

	return (
		<div className="w-full bg-black h-screen py-20">
			<div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 text-orange-500 bg-gray-700">
				<h1 className="text-4xl text-center my-3 text-white">
					Password Generator
				</h1>
				<div className="flex shadow rounded-lg overflow-hidden mb-4">
					<input
						type="text"
						ref={passwordRef}
						value={password}
						className="outline-none w-full py-1 px-3"
						placeholder="password"
						readOnly
					/>
					<button
						className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
						onClick={copyPasswordToClipboard}
					>
						Copy
					</button>
				</div>
				<div className="flex text-sm gap-x-2">
					<div className="flex items-center gap-x-1">
						{' '}
						<input
							type="range"
							id="length"
							min={6}
							max={50}
							value={length}
							className="cursor-pointer"
							onChange={(e) => setLength(e.target.value)}
						/>
						<label htmlFor="length">Length : {length}</label>
					</div>
					<div className="flex items-center gap-x-1">
						<input
							type="checkbox"
							id="numberInput"
							defaultChecked={allowNumber}
							onChange={() => setAllowNumber((prev) => !prev)}
						/>
						<label htmlFor="numberInput">Number</label>
					</div>
					<div className="flex items-center gap-x-1">
						<input
							type="checkbox"
							id="charInput"
							defaultChecked={allowChar}
							onChange={() => setAllowChar((prev) => !prev)}
						/>
						<label htmlFor="charInput">Character</label>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
