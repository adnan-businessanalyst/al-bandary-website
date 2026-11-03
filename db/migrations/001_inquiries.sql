-- Inquiry outcomes are dated facts, not one label.
-- quoted_at: a price was sent to this buyer.
-- ordered_at: an order was received. Setting it does not clear quoted_at.
-- not_now_at: sales judges this buyer is on file for later, with no quote and no order.
-- supplier_role: Albandari is the current supplier, an alternative, or a backup.
-- sales_reached_at: someone at Albandari reached the buyer.
-- meeting_held_at: a meeting took place.
-- meeting_place: albandari_factory or buyer_site. A booked appointment stays empty.

CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  idempotency_key uuid NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now(),
  type text NOT NULL DEFAULT 'form' CHECK (type IN ('form', 'phone', 'email')),
  language text NOT NULL CHECK (language IN ('ar', 'en')),
  page_path text NOT NULL,
  source text NOT NULL,
  name text NOT NULL,
  company text NOT NULL,
  email text NOT NULL,
  phone text,
  product text,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'received' CHECK (status = 'received'),
  quoted_at timestamptz,
  ordered_at timestamptz,
  not_now_at timestamptz,
  supplier_role text CHECK (
    supplier_role IS NULL
    OR supplier_role IN ('current_supplier', 'alternative', 'backup')
  ),
  sales_reached_at timestamptz,
  meeting_held_at timestamptz,
  meeting_place text CHECK (
    meeting_place IS NULL
    OR meeting_place IN ('albandari_factory', 'buyer_site')
  ),
  sender_notified_at timestamptz,
  receiver_notified_at timestamptz
);

CREATE INDEX IF NOT EXISTS inquiries_created_at_idx ON inquiries (created_at);
