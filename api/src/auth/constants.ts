export function getExcludedPaths()
{
	return [];
}

export function canByPass(path: string)
{
	if ((path.startsWith('/auth/')))
		return true;
	return getExcludedPaths().includes(path);
}