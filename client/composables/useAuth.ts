import type { tLogin, tRegister } from "~/types/auth";

function _detectAction(datas: tRegister | tLogin)
{
	return (datas as tRegister).confirm_password ? 'register' : 'login';
}

function _checkFields(datas: tRegister | tLogin)
{
	if (!datas.email || !datas.password || (_detectAction(datas) === 'register' && !(datas as tRegister).confirm_password))
	{
		addAlert({
			type: 'danger',
			message: `Veuillez remplir tous les champs`
		});
		return false;
	}
	return true;
}

async function _fetch(url: string, datas: tRegister | tLogin)
{
	await authorizedFetch(url, {
		method: 'POST',
		body: {...datas}
	})
	.then(() => {
		addAlert({
			type: 'success',
			message: `${_detectAction(datas) === 'register' ? 'Inscription' : 'Connexion'} réussie`
		});
		useRouter().push('/');
	});
}

export async function register(datas: tRegister)
{
	if (!_checkFields(datas))
		return;

	console.log(datas);
	
	if (datas.password !== datas.confirm_password) {
		addAlert({
			type: 'danger',
			message: `Les mots de passe ne correspondent pas`
		});
		return;
	}

	await _fetch(`/auth/${_detectAction(datas)}`, datas);
}

export async function login(datas: tLogin)
{
	if (!_checkFields(datas))
		return;

	await _fetch(`/auth/${_detectAction(datas)}`, datas);
}
