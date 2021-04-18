package tk.monkeycode.monkeyweather.userapi.config;

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
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import com.mchange.v2.c3p0.ComboPooledDataSource;

@Configuration
@EnableTransactionManagement
@PropertySource("classpath:db.properties")
@EnableJpaRepositories(basePackages = {"tk.monkeycode.monkeyweather.userapi.repository"})
public class AppContext {

	@Autowired
	private Environment env;

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

	@Bean
	public LocalContainerEntityManagerFactoryBean entityManagerFactory(DataSource dataSource) {
		Properties jpaProperties = new Properties();
		jpaProperties.setProperty("hibernate.dialect", env.getProperty("hibernate.dialect"));
		jpaProperties.setProperty("hibernate.show_sql", env.getProperty("hibernate.show_sql"));
		jpaProperties.setProperty("hibernate.hbm2ddl.auto", env.getProperty("hibernate.hbm2ddl.auto"));
		LocalContainerEntityManagerFactoryBean entityManager = new LocalContainerEntityManagerFactoryBean();
		entityManager.setDataSource(dataSource);
		entityManager.setPackagesToScan("tk.monkeycode.monkeyweather.userapi.domain");
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
	
	@Bean(name = "multipartResolver")
	public CommonsMultipartResolver getCommonsMultipartResolver() {
	    CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver();
	    multipartResolver.setMaxUploadSize(20971520);   // 20MB
	    multipartResolver.setMaxInMemorySize(1048576);  // 1MB
	    return multipartResolver;
	}
	
}
