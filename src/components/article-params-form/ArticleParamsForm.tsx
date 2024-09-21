import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import styles from './ArticleParamsForm.module.scss';
import { Select } from '../select/Select';
import { RadioGroup } from '../radio-group/RadioGroup';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';
import { Separator } from '../separator/Separator';
import cn from 'classnames';
import { useRef, useState, useEffect } from 'react';

type ArticleParamsFormProps = {
	onApplyStyles: (styles: {
		fontFamily: string;
		fontSize: string;
		fontColor: string;
		backgroundColor: string;
		contentWidth: string;
	}) => void;
};

export const ArticleParamsForm = ({
	onApplyStyles,
}: ArticleParamsFormProps) => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [fontSelect, setFontSelect] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [fontSizeSelect, setFontSizeSelect] = useState(
		defaultArticleState.fontSizeOption
	);
	const [fontColorSelect, setFontColorSelect] = useState(
		defaultArticleState.fontColor
	);
	const [backgroundColorSelect, setBackgroundColorSelect] = useState(
		defaultArticleState.backgroundColor
	);
	const [contentWidthSelect, setContentWidthSelect] = useState(
		defaultArticleState.contentWidth
	);
	const asideRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				asideRef.current &&
				!asideRef.current.contains(event.target as Node)
			) {
				setIsFormOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApplyStyles({
			fontFamily: fontSelect.value,
			fontSize: fontSizeSelect.value,
			fontColor: fontColorSelect.value,
			backgroundColor: backgroundColorSelect.value,
			contentWidth: contentWidthSelect.value,
		});
	};

	const handleReset = () => {
		setFontSelect(defaultArticleState.fontFamilyOption);
		setFontSizeSelect(defaultArticleState.fontSizeOption);
		setFontColorSelect(defaultArticleState.fontColor);
		setBackgroundColorSelect(defaultArticleState.backgroundColor);
		setContentWidthSelect(defaultArticleState.contentWidth);
		onApplyStyles({
			fontFamily: defaultArticleState.fontFamilyOption.value,
			fontSize: defaultArticleState.fontSizeOption.value,
			fontColor: defaultArticleState.fontColor.value,
			backgroundColor: defaultArticleState.backgroundColor.value,
			contentWidth: defaultArticleState.contentWidth.value,
		});
	};

	const container = isFormOpen ? styles.container_open : styles.container;

	return (
		<>
			<ArrowButton
				onClick={() => setIsFormOpen(!isFormOpen)}
				isOpen={isFormOpen}
			/>
			<aside className={cn(styles.container, container)} ref={asideRef}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Select
						selected={fontSelect}
						options={fontFamilyOptions}
						onChange={setFontSelect}
						title='Шрифт'
					/>
					<RadioGroup
						name='radioFonts'
						options={fontSizeOptions}
						selected={fontSizeSelect}
						title='размер шрифта'
						onChange={setFontSizeSelect}
					/>
					<Select
						selected={fontColorSelect}
						options={fontColors}
						onChange={setFontColorSelect}
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						selected={backgroundColorSelect}
						options={backgroundColors}
						onChange={setBackgroundColorSelect}
						title='цвет фона'
					/>
					<Select
						selected={contentWidthSelect}
						options={contentWidthArr}
						onChange={setContentWidthSelect}
						title='ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='button' onClick={handleReset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
