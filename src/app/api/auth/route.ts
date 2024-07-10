import { LoginUser, LogoutUser } from "@/promises/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const {email, password} = await request.json();
  let response;
  try {
    const resp: any = await LoginUser(email, password);
    response = NextResponse.json({ //getting hold of our success response
      message: "Successfully logged in",
      success: true
    });
    response.cookies.set("token", resp?.token, { httpOnly: true }); //setting the cookie
  } catch {
    response = NextResponse.error();
  }
  // return response
  return response;
}

export async function DELETE(request: NextRequest) {
  // const {email, password} = await request.json();
  let response;
  try {
    const resp = await LogoutUser();
    response = NextResponse.json({ //getting hold of our success response
      message: "Successfully logged out",
      success: true
    });
    response.cookies.delete("token"); //setting the cookie
  } catch {
    response = NextResponse.json({ //getting hold of our success response
      message: "Something went wrong",
      success: false
    })
  }
  // return response
  return response;
}