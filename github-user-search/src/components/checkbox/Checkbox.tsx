import React, { useEffect, useRef } from 'react'
import './Checkbox.css';

interface CheckboxProps {
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label?: React.ReactNode;
    indeterminate?: boolean;
    className?: string;
}

export default function Checkbox({
    checked = false,
    indeterminate = false,
    onChange,
    label = null,
    className = "",
}: CheckboxProps) {
    const checkboxRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (checkboxRef.current) {
            checkboxRef.current.indeterminate = indeterminate;
        }
    }, [indeterminate]);

    return (
        <label className={`checkbox ${className}`}>
            <input
                ref={checkboxRef}
                aria-label="checkbox"
                type="checkbox"
                checked={checked}
                onChange={onChange}
            />
            <span className={`checkmark ${indeterminate ? "indeterminate" : ""}`}>
                {indeterminate ? (
                    <span className="indeterminate-bar" />
                ) : (
                    <svg
                        className="checkmark-icon"
                        viewBox="0 0 16 14"
                        width="14"
                        height="12"
                    >
                        <path
                            d="M2 8.5L6 12.5L14 1.5"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                        />
                    </svg>
                )}
            </span>
            {label && <span className="checkbox-label">{label}</span>}
        </label>
    );
}
