import { type tAlert } from "../types/alert";

export function getAlertState() {
	return useState<tAlert[]>('alerts', () => []);
}

export function getAlerts() {
	return getAlertState().value;
}

export function getAlertMessageFormated(message: string) {
	const arr = message.split('');
	const arr2 = [];
	while (arr.length)
		arr2.push(arr.splice(0, 25).join(''));
	return arr2.join("- ");
}

export function addAlert(alert: tAlert) {
	if (!alert.time === undefined)
		alert.time = 5000;
	alert.message = getAlertMessageFormated(alert.message);
	alert.id = Math.random().toString();
	const state = getAlertState();
	state.value.push(alert);
	return alert;
}

export function editAlert(id: string, alert: tAlert) {
	const state = getAlertState();
	const index = state.value.findIndex(alert => alert.id === id);
	if (index !== -1)
		state.value[index] = alert;
	const _alert_document = document.getElementById(id);
	if (_alert_document)
	{
		const alert_item = _alert_document.querySelector('.alert');
		if (alert_item)
		{
			const alert_content = _alert_document.querySelector('.content');
			if (alert_content)
				alert_content.innerHTML = alert.message;
		}
	}

}

export function removeAlert(id: string) {
	const state = getAlertState();
	const index = state.value.findIndex(alert => alert.id === id);
	if (index !== -1)
		state.value.splice(index, 1);
}
