/* 로그인이 아직 없다. "지금 누구인가"를 꺼내는 자리를 여기 하나로 두고,
   인증을 붙일 때 이 함수 안만 고친다. 부르는 쪽은 그대로 둔다. */

const DEV_USER_ID = "00000000-0000-0000-0000-000000000001";

export function currentUserId(): string {
  if (process.env.NODE_ENV === "production") {
    // 모두가 한 계정을 공유하는 상태로 건강 기록을 받을 수는 없다.
    throw new Error("로그인이 없다. 인증을 붙이기 전에는 배포하지 않는다.");
  }
  return DEV_USER_ID;
}
