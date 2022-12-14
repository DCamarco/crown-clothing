import "./form-input.component.scss";

const FormInput = ({ label, ...otherProps }) => {
	return (
		<div className='group'>
			<input className='form-input' {...otherProps} />
			{label && (
				<label
					className={`${
						otherProps.value.legth ? "shrink" : ""
					} from-input-label`}
				>
					{label}
				</label>
			)}
		</div>
	);
};

export default FormInput;
