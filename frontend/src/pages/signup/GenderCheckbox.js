import React from 'react'

const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
    return (
        <div className='flex'>
            <div className="form-control">
                <label htmlFor="" className={`label gap-2 curser-pointer ${selectedGender === "male" ? "selected" : ""}`}>
                    <span className='text-base-300 label-text'>Male</span>
                    <input
                        type="checkbox"
                        className='checkbox border-slate-900'
                        checked={selectedGender === "male"}
                        onChange={() => onCheckboxChange("male")}
                    />
                </label>
            </div>
            <div className="form-control">
                <label htmlFor="" className={`label gap-2 curser-pointer ${selectedGender === "male" ? "selected" : ""}`}>
                    <span className='text-base-300 label-text'>Female</span>
                    <input
                        type="checkbox"
                        className='checkbox border-slate-900'
                        checked={selectedGender === "female"}
                        onChange={() => onCheckboxChange("female")}
                    />
                </label>
            </div>
        </div>
    )
}

export default GenderCheckbox