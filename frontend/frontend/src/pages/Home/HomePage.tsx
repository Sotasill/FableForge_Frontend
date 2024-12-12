
import styles from './HomePage.module.css';

const HomePage: React.FC = () => {
    return (
        <div>
            <h1 className={styles.title}>Home Page</h1>
            <p className={styles.description}>Welcome to the home page of FableForge</p>
        </div>
    );
};

export default HomePage;
