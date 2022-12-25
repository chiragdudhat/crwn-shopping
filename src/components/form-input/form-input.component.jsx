import './form-input.styles.scss';

const FormInput = ({label, ...otherInput})=> {
    return(
        <div className="group">
             <input className="form-input" {...otherInput}/>
            {label && (
                    <label className={`${
                        otherInput.value.length ? 'shrink' : ''
                    } form-input-label`}
                >{label}
            </label>
         )}
           
        </div>
    );
  
};

export default FormInput; 