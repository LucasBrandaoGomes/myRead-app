import Api from "./api.js";

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
	const promise = Api.post(`/sign-up`, body);
	return promise;
}

function SignInApi(body) {
	const promise = Api.post(`/sign-in`, body);
	return promise;
}

function getBooksApi() {
    const auth = getToken();
	const promise = Api.get(`/books`, auth.token);
	return promise;
}

function addReadApi(id) {
    const auth = getToken();
	const promise = Api.post(`/books/reads/${id}`, {}, auth.token);
	return promise;
}

function getReadsApi() {
    const auth = getToken();
	const promise = Api.get(`/books/reads`, auth.token);
	return promise;
}

function updateReadApi(id, value) {
    const auth = getToken();
	const promise = Api.put(`/books/reads/${id}`, value, auth.token);
	return promise;
}

function deleteReadApi(id) {
    const auth = getToken();
	const promise = Api.delete(`/books/reads/${id}`, auth.token);
	return promise;
}

function searchBookApi(search) {
    const auth = getToken();
	const promise = Api.get(`/books?search=${search}`, auth.token);
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