import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import styles from '../../styles/index.module.scss';
import { defaultArticleState } from '../../constants/articleProps';

const App = () => {
	const [selectedStyles, setSelectedStyles] = useState({
		fontFamily: defaultArticleState.fontFamilyOption.value,
		fontSize: defaultArticleState.fontSizeOption.value,
		fontColor: defaultArticleState.fontColor.value,
		backgroundColor: defaultArticleState.backgroundColor.value,
		contentWidth: defaultArticleState.contentWidth.value,
	});

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': selectedStyles.fontFamily,
					'--font-size': selectedStyles.fontSize,
					'--font-color': selectedStyles.fontColor,
					'--container-width': selectedStyles.contentWidth,
					'--bg-color': selectedStyles.backgroundColor,
				} as CSSProperties
			}>
			<ArticleParamsForm onApplyStyles={setSelectedStyles} />
			<Article />
		</div>
	);
};

export default App;
