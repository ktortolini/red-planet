export const title = 'MyThreeDee';

export const layout = '../_includes/layout.tsx';

const customStyle = {
	display: 'flex',
	justifyContent: 'center',
};

export default (data: Lume.Data, helpers: Lume.Helpers) => {
	return (
		<>
			<div id = 'threeDee' style = {customStyle}>
			</div>
		</>
	);
};
