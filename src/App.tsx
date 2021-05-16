import React from 'react';
import { Field, Formik, Form, FormikProps, FormikValues } from 'formik';

import { useLocalStorageState } from './hook';

const LOCAL_STORAGE_KEY = 'customLocalStorageKey';

const INITIAL_VALUES = { foo: '', bar: [] };

const MyForm = ({ saveForm, ...props }: { saveForm: (e: unknown) => void } & FormikProps<FormikValues>) => {
	React.useEffect(() => {
		saveForm(props.values);
	}, [props.values, saveForm]);

	const handleReset = React.useCallback(() => {
		saveForm(INITIAL_VALUES);
	}, [saveForm]);

	return (
		<Form>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<div style={{ flex: 1 }}>
					<h2>Form state:</h2>
					<pre>{JSON.stringify(props.values, null, 2)}</pre>
				</div>
				<div>
					<h2>LocalStorage:</h2>
					<div>
						<pre>{localStorage.getItem(LOCAL_STORAGE_KEY)}</pre>
					</div>
				</div>
			</div>
			<div>
				<h2>My form</h2>

				<div style={{ margin: 5 }} role="group" aria-labelledby="my-radio-group">
					<label>
						<Field type="radio" name="foo" value="One" />
						One
					</label>
					<label>
						<Field type="radio" name="foo" value="Two" />
						Two
					</label>
				</div>

				<div style={{ margin: 5 }} role="group" aria-labelledby="my-checkbox-group">
					<label>
						<Field type="checkbox" name="bar" value="Red" />
						Red
					</label>
					<label>
						<Field type="checkbox" name="bar" value="Blue" />
						Blue
					</label>
				</div>
			</div>
			<div style={{ marginTop: 10 }}>
				<button type="submit">Submit</button>
				<button onClick={handleReset} type="reset">
					Reset
				</button>
			</div>
		</Form>
	);
};

function App() {
	const [initialValues, handleUpdateForm] = useLocalStorageState({ key: LOCAL_STORAGE_KEY, value: INITIAL_VALUES });
	const handleSubmit = React.useCallback((values) => {
		console.log('Submitting form!!!!');
	}, []);

	return (
		<div className="App">
			<h1 style={{ textAlign: 'center' }}>LocalStorage state</h1>

			<Formik enableReinitialize initialValues={initialValues as FormikValues} onSubmit={handleSubmit}>
				{(props) => <MyForm saveForm={handleUpdateForm as (e: unknown) => void} {...props} />}
			</Formik>
		</div>
	);
}

export default App;
