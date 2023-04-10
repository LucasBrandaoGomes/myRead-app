import axios from "axios";

const BASE_URL = "https://my-read.onrender.com";

function getToken() {
	const auth = JSON.parse(localStorage.getItem("autoLogin"));
	if (auth) {
		const token = {
			headers: {
				Authorization: `Bearer ${auth}`,
			},
		};
		return { token };
	}
	return false;
}


function SignUpApi(body) {
	const promise = axios.post(`${BASE_URL}/sign-up`, body);
	return promise;
}

function SignInApi(body) {
	const promise = axios.post(`${BASE_URL}/sign-in`, body);
	return promise;
}

function getBooksApi() {
    const auth = getToken();
	const promise = axios.get(`${BASE_URL}/books`, auth.token);
	return promise;
}

function addReadApi(id) {
    const auth = getToken();
	const promise = axios.post(`${BASE_URL}/books/reads/${id}`, {}, auth.token);
	return promise;
}

function getReadsApi() {
    const auth = getToken();
	const promise = axios.get(`${BASE_URL}/books/reads`, auth.token);
	return promise;
}

function updateReadApi(id, value) {
    const auth = getToken();
	const promise = axios.put(`${BASE_URL}/books/reads/${id}`, value, auth.token);
	return promise;
}

function deleteReadApi(id) {
    const auth = getToken();
	const promise = axios.delete(`${BASE_URL}/books/reads/${id}`, auth.token);
	return promise;
}

function searchBookApi(search) {
    const auth = getToken();
	const promise = axios.get(`${BASE_URL}/books?search=${search}`, auth.token);
	return promise;
}

export {
	SignInApi, 
	SignUpApi, 
	getBooksApi, 
	getReadsApi, 
	updateReadApi, 
	addReadApi, 
	searchBookApi, 
	getToken, 
	deleteReadApi};
