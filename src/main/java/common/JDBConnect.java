package common;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

import javax.servlet.ServletContext;

public class JDBConnect {
	public Connection con; // DB 연결 담당
	public Statement stmt; // 정적 쿼리문 실행 시 사용
	public PreparedStatement psmt; // 동적 쿼리문 실행 시 사용
	public ResultSet rs; // select 쿼리문 결과 저장 시 사용

	// 기본 생성자
	public JDBConnect() {
		try {
			// JDBC 드라이버 로드
			Class.forName("oracle.jdbc.OracleDriver");

			// DB에 연결
			String url = "jdbc:oracle:thin:@localhost:1521:xe";	// 오라클 프로토콜@호스트명 or IP주소:포트번호:sid
			String id = "musthave";
			String pwd = "1234";
			con = DriverManager.getConnection(url, id, pwd);

			System.out.println("DB 연결 성공(기본 생성자)");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	
	// 두 번째 생성자
	public JDBConnect(String driver, String url, String id, String pwd) {
		try {
			// JDBC 드라이버 로드
			Class.forName(driver);
			
			// DB에 연결
			con = DriverManager.getConnection(url, id, pwd);
			
			System.out.println("DB 연결 성공(인수 생성자 1)");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	
	// 세 번째 생성자
	public JDBConnect(ServletContext application) {
		String driver = application.getInitParameter("OracleDriver");
		try {
			Class.forName(driver);
			
			String url = application.getInitParameter("OracleURL");
			String id = application.getInitParameter("OracleId");
			String pwd = application.getInitParameter("OraclePwd");
			con = DriverManager.getConnection(url, id, pwd);
			
			System.out.println("DB 연결 성공(인수 생성자 2)");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	// 연결 해제(자원 반납)
	public void close() {
		try {
			if (rs != null)
				rs.close();
			if (stmt != null)
				stmt.close();
			if (psmt != null)
				psmt.close();
			if (con != null)
				con.close();
			
			System.out.println("JDBC 자원 해제");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
