export interface PayloadDatas {
	userId: string,
	email: string,
}

export interface Payload {
	datas: PayloadDatas,
	iat: number,
	exp: number,
}
