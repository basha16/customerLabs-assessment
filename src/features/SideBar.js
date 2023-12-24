import { useState } from 'react'
import logo from '../chevron-left.svg';
import SegmentForm from './SegmentForm';
import { startCase } from 'lodash';
import segmentService from '../services/segmentService';
import { getRandomColor } from '../helper/helper';

const SideBar = () => {
    const [segmentName, setSegmentName] = useState('')
    const [selectedSchema, setSelectedSchema] = useState([])
    const [selectSchemaToAdd, setSelectSchemaToAdd] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState({ name: '', segment: '' })

    const handleAddToSchema = () => {
        if (selectSchemaToAdd) {
            setSelectedSchema((prev) => [...prev, { value: selectSchemaToAdd, color: getRandomColor(), name: startCase(selectSchemaToAdd) }])
            setErrors({ ...errors, segment: "" })
            setSelectSchemaToAdd('')
        }
    }

    const handleSelectSchema = (value) => {
        setSelectSchemaToAdd(value)
    }

    const handleRemoveSchema = (value) => {
        if (value) {
            const removedSchema = selectedSchema.filter((schema) => schema.value !== value)
            setSelectedSchema(removedSchema)
        }
    }

    const handleUpdateSchema = (e, index) => {
        const { value } = e.target
        const newSelectedSchema = [...selectedSchema]
        newSelectedSchema[index] = { value, color: getRandomColor(), name: startCase(value) }
        setSelectedSchema(newSelectedSchema)
    }

    const handleSegment = (e) => {
        const { value } = e.target
        setSegmentName(value)
        if (value) {
            setErrors({ ...errors, name: "" })
        }
    }

    const validate = () => {
        if (!segmentName.length) {
            setErrors(prevState => { return { ...prevState, name: "Please enter a segment name" } })
        }
        if (!selectedSchema.length) {
            setErrors(prevState => { return { ...prevState, segment: "Please add a schema" } })
        }
        if (!segmentName.length || !selectedSchema.length) {
            return false
        }
        return true
    }

    const handleSubmit = async () => {
        if (validate()) {
            try {
                setIsSubmitting(true)
                const changeSchemaFormat = [...selectedSchema]
                const formatted = Object.fromEntries(changeSchemaFormat.map(({ value, name }) => {
                    return [value, name]
                }))
                let segment = JSON.stringify({ segment_name: segmentName, schema: [formatted] })
                await segmentService.createSegment(segment)
                setIsSubmitting(false)
                setSelectedSchema([])
                setSegmentName('')
            } catch (error) {
                console.error(error)
            } finally {
                setIsSubmitting(false)
            }
        }
    }
    return (
        <div>
            <div class="mx-auto p-5 ms-5">
                <button class="btn btn-info" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Save segment</button>
            </div>

            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div class="">
                    <nav class="navbar navColor">
                        <div class="container-fluid">
                            <button class="btn btn-link navbar-brand" data-bs-dismiss="offcanvas" aria-label="Close">
                                <img src={logo} className="me-2" alt="logo" />
                                <span class='text-white '>Saving Segment</span>
                            </button>
                        </div>
                    </nav>
                </div>
                <div class="offcanvas-body">
                    <SegmentForm
                        onSelectSchema={handleSelectSchema}
                        onAddToSchema={handleAddToSchema}
                        onRemoveSchema={handleRemoveSchema}
                        onUpdateSchema={handleUpdateSchema}
                        onChangeSegmentName={handleSegment}
                        selectedSchema={selectedSchema}
                        selectSchemaToAdd={selectSchemaToAdd}
                        segmentName={segmentName}
                        errors={errors}
                    />
                </div>

                <nav class="navbar navColorFooter">
                    <div class="offcanvas-footer p-2 ms-3">
                        <button className="btn btn-success me-2" onClick={handleSubmit} disabled={isSubmitting}>
                            {isSubmitting ? <span className='indicator-progress d-block'>
                                Loading ...
                                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                            </span> : <span> Save the segment</span>}
                        </button>
                        <button className="btn btn-light" data-bs-dismiss="offcanvas" aria-label="Close">
                            <span className='text-danger fw-semibold'>Cancel</span>
                        </button>
                    </div>
                </nav>
            </div>
        </div>
    )
}
export default SideBar