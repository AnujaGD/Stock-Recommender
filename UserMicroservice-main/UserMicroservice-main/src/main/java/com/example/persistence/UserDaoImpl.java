package com.example.persistence;
import java.security.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Component;

import com.example.bean.SavedStock;
import com.example.util.SavedStockRowMapper;
import com.example.bean.User;
import com.example.util.UserRowMapper;


@Component
public class UserDaoImpl implements UserDao {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Override
	//login
	public User userlogin(String userName1, String password1) {
		@SuppressWarnings("deprecation")

		User user=jdbcTemplate.queryForObject("select * from users where  username=?", new Object []{userName1}, new UserRowMapper());
		if(BCrypt.checkpw(user.getPassword(),password1))
		{
			return user;
		}
		return null;
	}
	// get save stock

	public ArrayList<SavedStock> getSavedStocks(String username) {
		ArrayList<SavedStock> saved_stocks=null;
		saved_stocks=(ArrayList<SavedStock>)jdbcTemplate.query("select * from user_saved_stock where username=?",new Object[]{username},new SavedStockRowMapper());
		return saved_stocks;
	}

	//save stock
	@Override
	public int saveStock(SavedStock savestock) {
		System.out.println(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
		int rows=jdbcTemplate.update("insert into user_saved_stock (username,stock_symbol,quantity,currentPrice,pricetime) values(?,?,?,?,?)",savestock.getUsername(),savestock.getStock_symbol(),savestock.getQuantity(),savestock.getCurrent_price(),String.valueOf(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date())));
		return rows;
	}

	// register user
	@Override
	public int registerUser(User user) {
		int rows=jdbcTemplate.update("insert into users values(?,?,?,?,?)",user.getUserId(),user.getUsername(),user.getPassword(),user.getEmail(),user.getIdentification_no());
		return rows;
	}
	

	//delete saved stock
	@Override
	public int deletesavedStock(String username, String stock_symbol) {
		int rows=jdbcTemplate.update("delete from user_saved_stock where username =? and stock_symbol= ?",new Object[] {username,stock_symbol});
		return rows;
	}


}
