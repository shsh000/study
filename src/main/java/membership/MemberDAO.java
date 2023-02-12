package membership;

import java.sql.SQLException;

import common.JDBConnect;

public class MemberDAO extends JDBConnect {
	// 명시한 db 연결이 완료된 MemberDAO 객체 생성
	public MemberDAO(String drv, String url, String id, String pw) {
		super(drv, url, id, pw);
	}

	// 명시한 아이디, 패스워드와 일치하는 회원정보 반환
	public MemberDTO getMemberDTO(String uid, String upass) {
		MemberDTO dto = new MemberDTO(); // 회원 정보 DTO 객체 생성
		String query = "SELECT * FROM MEMBER WHERE ID = ? AND PASS = ?";

		try {
			psmt = con.prepareStatement(query); // 동적쿼리문 준비
			psmt.setString(1, uid);
			psmt.setString(2, upass);
			rs = psmt.executeQuery(); // 쿼리문 실행

			// 결과처리
			if (rs.next()) {
				// 쿼리 결과로 얻은 회원정보 DTO 객체에 저장
				dto.setId(rs.getString("id"));
				dto.setPass(rs.getString("pass"));
				dto.setName(rs.getString(3));
				dto.setRegidate(rs.getString(4));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return dto; // DTO 객체 반환
	}
}
