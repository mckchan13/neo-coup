import { ApiError } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";

export const dynamic = "force-dynamic";

// Get the current game
export async function GET(request: NextRequest): Promise<NextResponse<any>> {
  // Need to read the cookies and headers here

  // Read cookies and deny access if a session does not exist already

  // Pass in the params here to get the current game

  const { searchParams } = request.nextUrl;
  if (searchParams) {
    // need to redirect to fetching the current game state
    console.log(searchParams);
  }

  console.log("Hitting the GET Endpoint");

  const responseBody = {};

  return NextResponse.json(responseBody, {
    status: 200,
  });
}

// Creating a game
export async function POST(request: NextRequest): Promise<NextResponse<any>> {
  // Need to read the cookies and headers here
  const newGameState = createNewGameState();

  try {
    const response = await fetch(
      `http://localhost:${process.env.JSON_SERVER_PORT}/games`,
      {
        method: "POST",
        body: JSON.stringify(newGameState),
      }
    );

    console.log("The fetch response", response);

    if (response.status >= 400) {
      throw new ApiError(
        response.status,
        `POST request failed with error code ${response.status}.`
      );
    }
  } catch (error) {
    const errorResponseInit = {
      status: 520,
    };

    if (error instanceof ApiError || error instanceof Error) {
      console.error(error.message);
      if (error instanceof ApiError) {
        errorResponseInit.status = error.statusCode;
      }
    }

    return NextResponse.json({}, errorResponseInit);
  }

  const responseBody = { gameId: newGameState.id };

  return NextResponse.json(responseBody, {
    status: 200,
  });
}

function createNewGameState() {
  return {
    id: crypto.randomUUID(),
    numberOfConnectedPlayers: 1,
    gameState: "Created",
    players: [],
  };
}
