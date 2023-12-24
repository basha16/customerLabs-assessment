import Segment from "./Segment"
import minusLogo from '../minus-square.svg';
import { mapUniqueSchema } from "../helper/helper";
import { useEffect, useState } from "react";

const SegmentForm = ({ onSelectSchema, onAddToSchema, selectedSchema, selectSchemaToAdd, onRemoveSchema, onUpdateSchema, onChangeSegmentName, segmentName, errors }) => {
    const [uniqueSchema, setUniqueSchema] = useState([])

    useEffect(() => {
        if (selectedSchema) {
            const uniqueValues = mapUniqueSchema(selectedSchema)
            setUniqueSchema(uniqueValues)
        }
    }, [selectedSchema])

    const handleSelectSegment = (e) => {
        const { value } = e.target
        onSelectSchema(value)
    }

    const handleAddToSchema = () => {
        onAddToSchema()
    }
    
    return (
        <div className="">
            <label className="fw-normal">Enter the name of the segment</label>
            <div className="pt-3 pb-3">
                <input
                    id="txtSegmentName"
                    name="segment"
                    placeholder="Name of the segment"
                    className="w-100 p-1"
                    required
                    value={segmentName}
                    onChange={onChangeSegmentName}
                />
                {<span className="text-danger pt-3">{errors.name}</span>}
            </div>
            <label className="fw-normal pb-3">To save your segment, you need to add the schemas to build your query</label>
            <div>
                {selectedSchema.length ?
                    <Segment
                        selectedSchema={selectedSchema}
                        onRemoveSchema={onRemoveSchema}
                        onUpdateSchema={onUpdateSchema}

                    /> : null}
                
            </div>
            <div className="pt-3 ms-3">
                <select
                    id="selectAddToSegment"
                    name="addToSegment"
                    className="textBox p-2 me-3"
                    onChange={handleSelectSegment}
                    value={selectSchemaToAdd}
                >
                    <option>Add schema to segment</option>
                    {uniqueSchema.map((schema, index) => (
                        <option key={index} value={schema.value}>{schema.name}</option>
                    ))}

                </select>

                <button class="btn btn-link navbar-brand p-0">
                    <img src={minusLogo} className="me-2" alt="logo" />
                </button>
                {<span className="text-danger pt-3">{errors.segment}</span>}
            </div>
            <div className="pt-3">
                <button className="btn btn-link text-success" onClick={handleAddToSchema}>
                    <span >+Add new schema</span>
                </button>
            </div>
        </div>
    )
}
export default SegmentForm