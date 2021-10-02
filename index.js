const fs = require('fs')
const path = require('path')
const prompts = require('prompts')


let numberOfDevices
const pathToJson = `${process.cwd()}/json_input/sample.json`   // path.resolve(__dirname, 'json_input/sample.json')
let pathToResultJson
let error = false

const getDeviceNumber = async () => {
    const number = await prompts({
        type: 'number',
        name: 'value',
        message: 'Enter number of devices',
        validate: value => value < 0 ? 'Value must be greater then 0!' : true
    })   
    return number.value
}

async function multiplyDataArray(obj, numberOfDevices){
    if(!obj.hasOwnProperty('data')){     
        await createError(`Error! There is no 'data' property in provided JSON file!`, 10000)
    }

    if(!obj.data.length){     
        await createError(`Error! Array 'data' is empty! There is nothing to copy!`, 10000)
    }

    let newObj = JSON.parse(JSON.stringify(obj))
    newObj.data = []   
    
    for(let i = 0; i < numberOfDevices; i++){               
        newObj.data = [...newObj.data, JSON.parse(JSON.stringify(obj.data[0]))]
        if(newObj.data[i] && newObj.data[i].number){
            newObj.data[i].number = newObj.data[0].number + i
        }  
        if(newObj.data[i].device && newObj.data[i].device.number){
            newObj.data[i].device.number = newObj.data[0].device.number + i                       
        }       
    }
    return newObj
}

(async () => {
    try {     
        numberOfDevices = await getDeviceNumber()
        pathToResultJson = `${process.cwd()}/json_output/output_${numberOfDevices}_items.json`// path.resolve(__dirname, `json_output/output_${numberOfDevices}_items.json`)
        const bufferData = await fs.promises.readFile(pathToJson)
        let sampleJsonObj = await checkIfBufferIsJsonParsable(bufferData)
        const newJsonObj = await multiplyDataArray(sampleJsonObj, numberOfDevices)       
        if(!error){         
            await fs.promises.writeFile(pathToResultJson, JSON.stringify(newJsonObj, null, 2), { encoding: 'utf8' })
            console.log(`New file was saved in 'json_output' folder!`)
            await sleep(5000)
        }
    } catch (err) {      
        await createError(err, 10000)
    }
})()

async function checkIfBufferIsJsonParsable(buffer){
    try {
        return JSON.parse(buffer)
    } catch (error) {      
        await createError('Error! Wrong format of input JSON file!', 10000)
    }
}

async function createError(message, timeout){
    console.log(message)
    error = true
    await sleep(timeout)
    process.exit(1)
}

const sleep = (timeout) => {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout)      
    })
}