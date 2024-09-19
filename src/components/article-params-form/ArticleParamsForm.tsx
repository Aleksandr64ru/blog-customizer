import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { Select } from '../select/Select';
import { RadioGroup } from '../radio-group/RadioGroup';
import {
	OptionType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Separator } from '../separator/Separator';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import cn from 'classnames';

type ArticleStates = {
	fontSelectState: OptionType;
	setFontSelectState: Dispatch<SetStateAction<OptionType>>;

	fontSizeSelectState: OptionType;
	setFontSizeSelectState: Dispatch<SetStateAction<OptionType>>;

	fontColorSelectState: OptionType;
	setFontColorSelectState: Dispatch<SetStateAction<OptionType>>;

	backgroundColorSelectState: OptionType;
	setBackgroundColorSelectState: Dispatch<SetStateAction<OptionType>>;

	contentWidthSelectState: OptionType;
	setContentWidthSelectState: Dispatch<SetStateAction<OptionType>>;

	onResetClick: () => void;
	onSubmitClick: () => void;
};

export const ArticleParamsForm = (props: ArticleStates) => {
	// Хуки
	const [isFormOpen, setIsFormOpen] = useState(false);
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

	// Хэндлеры
	const handleButtonClick = () => {
		setIsFormOpen(!isFormOpen);
	};

	const handleFontSelectChange = (fontSelected: OptionType) => {
		props.setFontSelectState(fontSelected);
	};
	const handleFontSizeSelectChange = (fontSizeSelected: OptionType) => {
		props.setFontSizeSelectState(fontSizeSelected);
	};
	const handleFontColorSelectChange = (fontColorSelected: OptionType) => {
		props.setFontColorSelectState(fontColorSelected);
	};
	const handleBackgroundColorSelectChange = (
		backgroundColorSelected: OptionType
	) => {
		props.setBackgroundColorSelectState(backgroundColorSelected);
	};
	const handleContentWidthSelectChange = (contentWidthSelected: OptionType) => {
		props.setContentWidthSelectState(contentWidthSelected);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		props.onSubmitClick();
	};

	const container = isFormOpen ? styles.container_open : styles.container;

	return (
		<>
			<ArrowButton onClick={handleButtonClick} isOpen={isFormOpen} />
			<aside className={cn(styles.container, container)} ref={asideRef}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Select
						selected={props.fontSelectState}
						options={fontFamilyOptions}
						onChange={(fontSelected: OptionType) => {
							handleFontSelectChange(fontSelected);
						}}
						title='Шрифт'
					/>
					<RadioGroup
						name='radioFonts'
						options={fontSizeOptions}
						selected={props.fontSizeSelectState}
						title='размер шрифта'
						onChange={handleFontSizeSelectChange}
					/>
					<Select
						selected={props.fontColorSelectState}
						options={fontColors}
						onChange={handleFontColorSelectChange}
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						selected={props.backgroundColorSelectState}
						options={backgroundColors}
						onChange={handleBackgroundColorSelectChange}
						title='цвет фона'
					/>
					<Select
						selected={props.contentWidthSelectState}
						options={contentWidthArr}
						onChange={handleContentWidthSelectChange}
						title='ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='reset'
							onClick={props.onResetClick}
						/>
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
