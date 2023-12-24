export function getAuthorizationName()
{
	return 'authorization';
}

export function getAuthorization()
{
	const name = getAuthorizationName();

	const cookie = useCookie(name).value;
	try {
		const local = localStorage.getItem(name);
		if (!cookie?.length && local?.length)
		{
			setAuthorization(local as string);
			return local;
		}
		return cookie;
	} catch (error) {
		return cookie;
	}
	
}

export function setAuthorization(authorization: string)
{
	const name = getAuthorizationName();
	useCookie(name, {
		default() {
			return authorization;
		},
	});
	localStorage.setItem(name, authorization);
}

export function clearAuthorization()
{
	const name = getAuthorizationName();

	useCookie(name, {
		maxAge: -1
	}).value = "";
	localStorage.removeItem(name);
}

export async function isAuthorized(path: string)
{
	// const authorization = getAuthorization();
	// if (!authorization)
	// 	useRouter().push(getLoginPage());
	return true;
	// const runtimeConfig = getRuntimeConfig();
	// const LOGIN_PAGE = runtimeConfig.public.LOGIN_PAGE;
	// const REGISTER_PAGE = runtimeConfig.public.REGISTER_PAGE;
	// const AUTH_ROUTE = runtimeConfig.public.AUTH_ROUTE;
	// if (path.startsWith(AUTH_ROUTE))
	// 	return;
	// if (!authorization)
	// 	return useRouter().push(LOGIN_PAGE);
	// const permission = await authorizedFetch(`/auth/is-authorized`, {
	// 	method: 'POST',
	// 	body: {
	// 		path
	// 	}
	// }).then(() => {
	// 	return true
	// })
	// .catch(error => {
	// 	console.log(error);
		
	// 	return false
	// })
	// return permission ?? useRouter().push(LOGIN_PAGE);
}