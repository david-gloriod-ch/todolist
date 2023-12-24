export async function authorizedFetch<T>(url: string, opts: any = {})
{
	const runtimeConfig = useRuntimeConfig();

	return await $fetch<T>(url, {
		...opts,
		onRequest({ options })
		{
			options.baseURL = runtimeConfig.public.API_URL,
			options.credentials = 'include';
		},
		onRequestError({ request, options, error }) {
		},
		onResponse({ response, options }) {
		},
		onResponseError({ request, response, options }) {
			if (response.status >= 500 && response.status < 600)
			{
				addAlert({
					type: 'danger',
					message: 'Erreur serveur, veuillez réessayer ou contacter le service informatique'
				});
			}
			else
			{
				if (typeof response._data.message === 'string')
				{
					addAlert({
						type: 'danger',
						message: response._data.message
					});
				}
				else
				{
					for (let message of response._data.message)
					{
						addAlert({
							type: 'danger',
							message: message
						});
					}
				}
			}
		},
	});
}
