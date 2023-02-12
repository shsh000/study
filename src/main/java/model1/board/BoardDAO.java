package model1.board;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.Vector;

import javax.servlet.ServletContext;

import common.JDBConnect;

public class BoardDAO extends JDBConnect {
	public BoardDAO(ServletContext application) {
		super(application);
	}
	
	// 검색 조건에 맞는 게시물의 갯수 반환
	public int selectCount(Map<String, Object> map) {
		int totalCount = 0;
		
		// 게시물 수를 얻어오는 쿼리문
		String query = "SELECT COUNT(*) FROM BOARD";
		if (map.get("searchWord") != null) {
			query += " WHERE " + map.get("searchField") + " " + " LIKE '%" + map.get("searchWord") + "%'";
		}
		
		try {
			stmt = con.createStatement();
			rs = stmt.executeQuery(query);
			rs.next();
			totalCount = rs.getInt(1);
		} catch (Exception e) {
			System.out.println("게시물 수를 구하는 중 예외 발생");
			e.printStackTrace();
		}

		return totalCount;
	}
	
	// 검색 조건에 맞는 게시물 목록 반환
	public List<BoardDTO> selectList(Map<String, Object> map) {
		List<BoardDTO> bbs = new Vector<BoardDTO>(); // 결과를 담을 변수
		
		String query = "SELECT * FROM BOARD";
		if (map.get("searchWord") != null) {
			query += " WHERE " + map.get("searchField") + " "
					+ " LIKE '%" + map.get("searchWord") + "%' ";
		}
		query += " ORDER BY NUM DESC";
		
		try {
			stmt = con.createStatement();
			rs = stmt.executeQuery(query);
			
			while (rs.next()) {
				BoardDTO dto = new BoardDTO();
				
				dto.setNum(rs.getString("num"));
				dto.setTitle(rs.getString("title"));
				dto.setContent(rs.getString("content"));
				dto.setPostdate(rs.getDate("postdate"));
				dto.setId(rs.getString("id"));
				dto.setVisitcount(rs.getString("visitcount"));
				
				bbs.add(dto);
			}
		} catch (Exception e) {
			System.out.println("게시물 조회 중 예외 발생");
			e.printStackTrace();
		}
		
		return bbs;
	}
	
	// 게시글 등록
	public int insertWrite(BoardDTO dto) {
		int result = 0;
		
		try {
			String query = "INSERT INTO BOARD ( "
					+ " num, title, content, id, visitcount) "
					+ " VALUES ( "
					+ " seq_board_num.NEXTVAL, ?, ?, ?, 0)";
			psmt = con.prepareStatement(query);
			psmt.setString(1, dto.getTitle());
			psmt.setString(2, dto.getContent());
			psmt.setString(3, dto.getId());
			
			result = psmt.executeUpdate();
		} catch (Exception e) {
			System.out.println("게시물 입력 중 예외 발생");
			e.printStackTrace();
		}
		
		return result;
	}
	
	// 게시글 상세보기
	public BoardDTO selectView(String num) {
		BoardDTO dto = new BoardDTO();
		
		String query = "SELECT B.*, M.name "
				+ " FROM MEMBER M INNER JOIN BOARD B "
				+ " ON M.id = B.id "
				+ " WHERE NUM = ?";
		
		try {
			psmt = con.prepareStatement(query);
			psmt.setString(1, num);
			rs = psmt.executeQuery();
			
			if (rs.next()) {
				dto.setNum(rs.getString(1));
				dto.setTitle(rs.getString(2));
				dto.setContent(rs.getString("content"));
				dto.setPostdate(rs.getDate("postdate"));
				dto.setId(rs.getString("id"));
				dto.setVisitcount(rs.getString(6));
				dto.setName(rs.getString("name"));
			}
		} catch (Exception e) {
			System.out.println("게시글 상세보기 중 예외 발생");
			e.printStackTrace();
		}
		
		return dto;
	}
	
	// 조회수 증가
	public void updateVisitCount(String num) {
		String query = "UPDATE BOARD SET "
				+ " visitcount = visitcount + 1 "
				+ " WHERE NUM = ?";
		
		try {
			psmt = con.prepareStatement(query);
			psmt.setString(1, num);
			psmt.executeQuery();
			
		} catch (Exception e) {
			System.out.println("게시물 조회수 증가 중 예외 발생");
			e.printStackTrace();
		}
	}
	
	// 게시글 수정
	public int updateEdit(BoardDTO dto) {
		int result = 0;
		
		try {
		String query = "UPDATE BOARD SET "
				+ " title = ?, content = ? "
				+ " WHERE NUM = ?";
		
			psmt = con.prepareStatement(query);
			psmt.setString(1, dto.getTitle());
			psmt.setString(2, dto.getContent());
			psmt.setString(3, dto.getNum());
			
			result = psmt.executeUpdate();
		} catch (Exception e) {
			System.out.println("게시물 수정 중 예외 발생");
			e.printStackTrace();
		}
		
		return result;
	}
	
	// 게시글 삭제
	public int deletePost(BoardDTO dto) {
		int result = 0;
		
		try {
			String query = "DELETE FROM BOARD WHERE NUM = ?";
			
			psmt = con.prepareStatement(query);
			psmt.setString(1, dto.getNum());
			
			result = psmt.executeUpdate();
		} catch (Exception e) {
			System.out.println("게시물 삭제 중 예외 발생");
			e.printStackTrace();
		}
		
		return result;
	}
	
	// 게시글 목록(페이징 기능 포함)
	public List<BoardDTO> selectListPage(Map<String, Object> map) {
		List<BoardDTO> bbs = new Vector<BoardDTO>();
		
		String query = "SELECT * FROM ( "
				+ "SELECT Tb.*, ROWNUM rNum FROM ( "
				+ "SELECT * FROM BOARD";
		
		// 검색 조건 추가
		if (map.get("searchWord") != null) {
			query += " WHERE " + map.get("searchField")
			+ " LIKE '%" + map.get("searchWord") + "%' ";
		}
		
		query += " ORDER BY NUM DESC "
				+ " ) Tb "
				+ " ) "
				+ " WHERE rNum BETWEEN ? AND ?";
		
		try {
			psmt = con.prepareStatement(query);
			psmt.setString(1, map.get("start").toString());
			psmt.setString(2, map.get("end").toString());
			
			rs = psmt.executeQuery();
			
			while (rs.next()) {
				BoardDTO dto = new BoardDTO();
				dto.setNum(rs.getString("num"));
				dto.setTitle(rs.getString("title"));
				dto.setContent(rs.getString("content"));
				dto.setPostdate(rs.getDate("postdate"));
				dto.setId(rs.getString("id"));
				dto.setVisitcount(rs.getString("visitcount"));
				
				bbs.add(dto);
			}
		} catch (Exception e) {
			System.out.println("게시물 조회 중 예외 발생");
			e.printStackTrace();
		}
		
		return bbs;
	}
}
