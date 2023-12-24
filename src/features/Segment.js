import { useEffect, useState } from 'react';
import minusLogo from '../minus-square.svg';
import { mapUniqueSchema } from '../helper/helper';

const Segment = ({ selectedSchema, onRemoveSchema, onUpdateSchema }) => {
    const [uniqueSchemas, setUniqueSchemas] = useState([])

    useEffect(() => {
        if (selectedSchema) {
            const res = mapUniqueSchema(selectedSchema)
            setUniqueSchemas(res)
        }
    }, [selectedSchema])


    return (
        <div className="border border-primary-subtle p-1 border-3">
            <div class=" d-flex flex-row-reverse">
                {selectedSchema.map((value) => {
                    return (
                        <>
                            <span className='ms-2 me-2'>User Traits</span>
                            <span className={`bullet bullet-dot bg-${value.color}  pt-2 `}></span>
                        </>
                    )
                })}

            </div>
            {selectedSchema && selectedSchema.map((schema, index) => {
                return (
                    <>
                        <div className="d-flex flex-row py-2 ms-2" key={index}>
                        <span className={`bullet bulletDot bg-${schema.color} mt-5 pt-2 me-2`}></span>
                            <select
                                id="selectAddToSegment"
                                name="addToSegment"
                                className="p-2 textBox me-2"
                                onChange={(e) => onUpdateSchema(e, index)}
                                value={schema.value}
                            >
                                <option value={schema.value}>{schema.name}</option>
                                {uniqueSchemas.map((uniqueSchema, index) => (
                                    <option id="firstName" key={index} value={uniqueSchema.value}>{uniqueSchema.name}</option>
                                ))}
                            </select>
                            <button class="btn btn-link navbar-brand p-0 rounded-0" onClick={() => onRemoveSchema(schema.value)}>
                                <img src={minusLogo} className="me-2" alt="logo" />

                            </button>
                        </div>
                    </>
                )
            })}

        </div>
    )
}
export default Segment