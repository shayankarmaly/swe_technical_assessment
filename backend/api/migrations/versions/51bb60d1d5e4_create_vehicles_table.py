"""create vehicles table

Revision ID: 51bb60d1d5e4
Revises: 
Create Date: 2025-12-05 08:27:33.049396

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '51bb60d1d5e4'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    op.create_table(
        "vehicles",
        sa.Column("id", sa.String, primary_key=True),
        sa.Column("vin", sa.Text, nullable=False, unique=True),
        sa.Column("description", sa.Text),
        sa.Column("make", sa.Text),
        sa.Column("model", sa.Text),
        sa.Column("image_urls", sa.JSON),
        sa.Column("created_at", sa.TIMESTAMP(timezone=True), server_default=sa.text("now()")),
    )

def downgrade():
    op.drop_table("vehicles")
