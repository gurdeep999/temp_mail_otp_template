import axios from "axios";
import crypto from 'crypto';
import { faker } from '@faker-js/faker'

var baseUrl = ''

const setBaseUrl = (url) => baseUrl = url

const getDomains = async (key, host) => {
    try {
        const response = await axios.get(`${baseUrl}/domains/`, {
            headers: {
                'X-RapidAPI-Key': key,
                'X-RapidAPI-Host': host
            }
        })
        return response.data

    } catch (error) {
        console.log(error)
    }
}

const generateEmail = (domain) => {
    const fullName = faker.name.firstName() + faker.name.lastName()
    const email = `${fullName.toLowerCase()}${domain}`
    return email
}

const getMessages = async (email, key, host) => {
    try {
        const response = await axios.get(`${baseUrl}/mail/id/${getHash(email)}/`, {
            headers: {
                'X-RapidAPI-Key': key,
                'X-RapidAPI-Host': host
            }
        })
        return response.data
    } catch (e) {
        console.log(e)
    }
}

const getHash = (str) => crypto.createHash('md5').update(str).digest('hex')

export default { getDomains, getHash, getMessages, setBaseUrl, generateEmail }