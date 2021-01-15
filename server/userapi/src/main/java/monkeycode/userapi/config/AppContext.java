package monkeycode.userapi.config;

import java.beans.PropertyVetoException;
import java.util.Properties;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.hibernate5.HibernateTransactionManager;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.mchange.v2.c3p0.ComboPooledDataSource;

@Configuration
@EnableTransactionManagement
@PropertySource("classpath:db.properties")
@EnableJpaRepositories(basePackages = {"monkeycode.userapi.repository"})
public class AppContext {

	@Autowired
	private Environment env;

	// DataBase Configuration
	@Bean(destroyMethod = "close")
	public DataSource dataSource() {
		ComboPooledDataSource ds = new ComboPooledDataSource();
		try {
			ds.setDriverClass(env.getProperty("db.driver"));
		} catch (PropertyVetoException e) {
			throw new RuntimeException("Error: No se pudo configurar el driver de la fuente de datos.");
		}
		ds.setJdbcUrl(env.getProperty("db.url"));
		ds.setUser(env.getProperty("db.username"));
		ds.setPassword(env.getProperty("db.password"));
		ds.setAcquireIncrement(env.getProperty("c3p0.acquire_increment", Integer.class));
		ds.setMinPoolSize(env.getProperty("c3p0.min_size", Integer.class));
		ds.setMaxPoolSize(env.getProperty("c3p0.max_size", Integer.class));
		ds.setMaxIdleTime(env.getProperty("c3p0.max_idle_time", Integer.class));
		ds.setUnreturnedConnectionTimeout(env.getRequiredProperty("c3p0.unreturned_connection_timeout", Integer.class));
		return ds;
	}

//	@Bean
//	public LocalSessionFactoryBean sessionFactory() {
//		Properties properties = new Properties();
//		properties.setProperty("hibernate.dialect", env.getProperty("hibernate.dialect"));
//		properties.setProperty("hibernate.show_sql", env.getProperty("hibernate.show_sql"));
//		LocalSessionFactoryBean factory = new LocalSessionFactoryBean();
//		factory.setDataSource(dataSource());
//		factory.setPackagesToScan("monkeycode.userapi.domain");
//		factory.setHibernateProperties(properties);
//		return factory;
//	}
	
	@Bean
	public LocalContainerEntityManagerFactoryBean entityManagerFactory(DataSource dataSource) {
		Properties jpaProperties = new Properties();
		jpaProperties.setProperty("hibernate.dialect", env.getProperty("hibernate.dialect"));
		jpaProperties.setProperty("hibernate.show_sql", env.getProperty("hibernate.show_sql"));
		jpaProperties.setProperty("hibernate.hbm2ddl.auto", env.getProperty("hibernate.hbm2ddl.auto"));
		LocalContainerEntityManagerFactoryBean entityManager = new LocalContainerEntityManagerFactoryBean();
		entityManager.setDataSource(dataSource);
		entityManager.setPackagesToScan("monkeycode.userapi.domain");
		entityManager.setJpaVendorAdapter(new HibernateJpaVendorAdapter());
		entityManager.setJpaProperties(jpaProperties);
		return entityManager;
	}
	
	@Bean
	public JpaTransactionManager transactionManager(EntityManagerFactory entityManagerFactory) {
		JpaTransactionManager transactionManager = new JpaTransactionManager();
		transactionManager.setEntityManagerFactory(entityManagerFactory);
		return transactionManager;
	}
//
//	@Bean
//	public HibernateTransactionManager transactionManager() {
//		HibernateTransactionManager tx = new HibernateTransactionManager();
//		tx.setSessionFactory(sessionFactory().getObject());
//		return tx;
//	}
	
}
