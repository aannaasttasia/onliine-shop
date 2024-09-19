import "./css/Login.scss";

export interface ErrorProps {
    errorMessage: string;
    showMessage: boolean;
}

export default function Error({ errorMessage, showMessage }: ErrorProps) {
    return (
        showMessage && (
            <div className="error-popup">
                <p>{errorMessage}</p>
            </div>
        )
    );
}
