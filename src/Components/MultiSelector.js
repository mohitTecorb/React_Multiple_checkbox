import React, { useEffect, useState } from 'react'
import orderData from './DemoData'
const MultiSelector = () => {
    const [dummyData, setDummyData] = useState([])
    const [isAllChecked, setIsAllChecked] = useState(false)
    const [selectedId, setSelectedId] = useState([]) // in this state you will get all the Id of selected checkbox

    useEffect(() => {
        setDummyData(orderData)
    }, [])
    //*****************************handle Checkbox function ****************************************** */
    const handleCheckBox = (id) => {
        let newData = dummyData
        newData?.map((it) => {
            if (it.Id == id) {
                it.isSelect = !it.isSelect
            }
        })
        setDummyData([...newData]) // here , when click on single checkbox then i'm changing the status of cehcked or unchecked 
        let selectedData = dummyData?.filter((data) => data.isSelect) // here we get the length of total selected cehckbox 
        if (selectedData.length == dummyData.length) { // here compare the length 
            setIsAllChecked(true) // making select all cehckbox checked if length is equal 
        } else {
            setIsAllChecked(false)
        }
        let tempdata = selectedData?.map((data) => data.Id)
        setSelectedId(tempdata)
    }
    //******************************* this is for select all function ************************************************ */
    const selectAllCheckeBox = () => {
        setIsAllChecked(!isAllChecked)
        let allCheck = dummyData?.map((data) => { return ({ ...data, isSelect: isAllChecked ? false : true }) })
        setDummyData([...allCheck])
        let tempdata = allCheck?.reduce((acc, curr) => {
            if (curr.isSelect) {
                acc.push(curr.Id)
            }
            return acc;
        }, [])
        setSelectedId(tempdata)
    }
    return (
        <div>
            <div >
                <input
                    id="checkbox"
                    checked={isAllChecked}
                    name="allselect"
                    type="checkbox"
                    onChange={(e) => selectAllCheckeBox(e, null)}
                />
                <label for="checkbox" >Select All</label>

            </div>
            {dummyData?.map((item, index) => {
                return (
                    <div key={index}>
                        <input
                            id={item.Id}
                            name="checkbox"
                            type="checkbox"
                            checked={item.isSelect}
                            onChange={(e) => { handleCheckBox(item.Id, item) }}
                        />
                        <label for={item?.Id}>{item.name}</label>
                    </div>
                )
            })}
        </div>
    )
}

export default MultiSelector