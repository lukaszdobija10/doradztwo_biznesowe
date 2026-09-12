#!/usr/bin/env bash
#
# Uruchamia lokalną bazę PostgreSQL na potrzeby panelu.
#
#   ./scripts/baza-lokalna.sh start
#   ./scripts/baza-lokalna.sh stop
#   ./scripts/baza-lokalna.sh status
#
# Korzystamy z tego samego klastra co CRM (~/.local/pgdata-crm, port 55432),
# tylko w osobnej bazie `panel_dev` i pod osobną rolą `panel`. Dzięki temu na
# maszynie chodzi jeden serwer zamiast dwóch, a dane obu projektów i tak są
# rozdzielone.
#
# `stop` celowo NIE jest tu skrótem do zatrzymania klastra jednym poleceniem
# bez ostrzeżenia — na tym samym serwerze stoi baza CRM-a.

set -euo pipefail

PGBIN="${PGBIN:-$HOME/.local/pgsql/bin}"
PGDATA="${PGDATA:-$HOME/.local/pgdata-crm}"
PGPORT="${PGPORT:-55432}"

if [ ! -x "$PGBIN/pg_ctl" ]; then
  echo "Nie znalazłem PostgreSQL w $PGBIN."
  echo "Ustaw PGBIN na katalog z binariami albo wskaż własną bazę przez DATABASE_URL."
  exit 1
fi

case "${1:-}" in
  start)
    if "$PGBIN/pg_ctl" -D "$PGDATA" status >/dev/null 2>&1; then
      echo "Klaster już działa na 127.0.0.1:$PGPORT"
    else
      "$PGBIN/pg_ctl" -D "$PGDATA" \
        -o "-p $PGPORT -c listen_addresses=127.0.0.1" \
        -l "$PGDATA/server.log" start
      echo "Baza słucha na 127.0.0.1:$PGPORT"
    fi
    ;;

  stop)
    echo "Uwaga: na tym klastrze stoi także baza CRM-a."
    echo "Jeśli na pewno chcesz go zatrzymać: $PGBIN/pg_ctl -D $PGDATA stop"
    ;;

  status)
    "$PGBIN/pg_ctl" -D "$PGDATA" status
    ;;

  *)
    echo "Użycie: $0 {start|stop|status}"
    exit 1
    ;;
esac
