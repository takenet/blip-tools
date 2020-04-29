import React from "react"
import { CSVReader } from 'react-papaparse';
import { buildModel, buildData } from '../util';
import { errorToast } from '../toastUtil';
function CsvForm({ OnLoadData }) {

    const handleOnDrop = (data) => {
        let header = data.shift();

        OnLoadData(header, buildData(header.data, data), buildModel(header.data))
    }

    const handleOnError = (err, file, inputElem, reason) => {
        errorToast("Error loading CSV!")
    }

    const handleOnRemoveFile = (data) => {
        OnLoadData({}, [], [])
    }

    return <div>
        <CSVReader
            onDrop={handleOnDrop}
            onError={(err, file, inputElem, reason) => { handleOnError(err, file, inputElem, reason) }}
            addRemoveButton
            onRemoveFile={handleOnRemoveFile}
        >
            <span>Drop CSV file here or click to upload.</span>
        </CSVReader>
    </div>
}



export default CsvForm