import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import { FC } from 'react';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

interface ArrowButtonProps {
	onClick?: OnClick;
	isOpen?: boolean;
}

export const ArrowButton: FC<ArrowButtonProps> = ({ onClick, isOpen }) => {
	const containerClass = clsx(styles.container, {
		[styles.container_open]: isOpen,
	});
	const arrowImageClass = clsx(styles.arrow, {
		[styles.arrow_open]: isOpen,
	});

	return (
		/* Не забываем указывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={containerClass}
			onClick={onClick}>
			<img src={arrow} alt='иконка стрелочки' className={arrowImageClass} />
		</div>
	);
};
