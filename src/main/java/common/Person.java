package common;

// DTO
public class Person {
	private String name;
	private int age;

	// 기본 생성자
	public Person() {
		
	}

	public Person(String name, int age) {
		super();
		this.name = name;
		this.age = age;
	}

	// 메서드
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}
	
}
