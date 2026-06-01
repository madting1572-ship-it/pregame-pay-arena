# Implementation Plan - Tap In App

A mobile-responsive web application where players can join games, pay to participate, and connect with others.

## Scope Summary
- **Landing Page**: Introduction to "Tap In" and how it works.
- **Game Lobby**: View available games or create new ones.
- **Payment Flow (Simulation)**: A UI-driven payment process that "sends" money to the specified number (0704106323) via a simulated gateway.
- **Game Interaction**: Basic interface for playing with others (since no backend is available, this will be simulated using local state and mock data).
- **Player Profiles**: Basic local profile setup.

## Non-Goals
- **Real Backend/Database**: No Supabase or server-side DB. All state is local to the browser session (localStorage).
- **Real Payment Integration**: No actual Stripe/Mobile Money API integration. We will simulate the "Payment Sent" confirmation.
- **Real-time Multiplayer**: No WebSockets. Interaction with "others" will be simulated or limited to local peer-to-peer concepts if applicable, but primarily mock-driven for this session.

## Assumptions & Open Questions
- **Assumption**: The payment number (0704106323) should be displayed prominently during the "payment" step for the user to confirm.
- **Question**: What kind of "games" are played? (Defaulting to a simple card/tap-based game unless specified).

## Affected Areas
- **Frontend (React)**: All UI components, state management, and routing.
- **Data Layer**: `localStorage` for persisting user "credits" or "game status" within a session.

## Phases & Deliverables

### Phase 1: Foundation & Branding
- **Deliverables**:
  - Update `App.tsx` with routing (using a simple state-based router or `react-router-dom` if available, otherwise conditional rendering).
  - Setup core theme colors (energetic, social).
  - Create `Header` and `Footer` components.
- **Owner**: `frontend_engineer`

### Phase 2: Landing & Game Discovery
- **Deliverables**:
  - `Hero` section explaining the "Pay & Play" concept.
  - `GameCard` component to display available "matches".
  - `Lobby` view where users can see "Current Games".
- **Owner**: `frontend_engineer`

### Phase 3: Payment Simulation Flow
- **Deliverables**:
  - `PaymentModal` or `PaymentPage`.
  - Display the recipient number: **0704106323**.
  - Mock "Verifying Transaction" animation.
  - Update local state to "Paid" status.
- **Owner**: `frontend_engineer`

### Phase 4: Game Interface & Mock Social
- **Deliverables**:
  - `GameView` component where the "playing" happens.
  - "Players in Match" list (mock data).
  - Tap-based game logic (simple interaction).
- **Owner**: `frontend_engineer`

### Phase 5: Polishing & Copywriting
- **Deliverables**:
  - Ensure all references to `tap-in.com` and the payment number are correct.
  - Add "Success" notifications using the provided `sonner` or `alert` components.
- **Owner**: `quick_fix_engineer`

## Sequencing Constraints
- Phase 3 (Payment) must be completed before a user can "access" Phase 4 (Game View).
- All work is frontend-only.
