'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserCheck } from "lucide-react";
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import type { ActivatedUserStatus } from "@/actions/admin";

interface ActivatedUsersCardProps {
  activatedUsers: ActivatedUserStatus[];
}

const FormattedDateCell = ({ dateString }: { dateString: string | undefined }) => {
  const [formattedDate, setFormattedDate] = useState('...');

  useEffect(() => {
    // This effect runs only on the client, after hydration, preventing a mismatch.
    if (dateString) {
      setFormattedDate(format(new Date(dateString), 'dd-MM-yy HH:mm', { locale: nl }));
    } else {
      setFormattedDate('Nooit');
    }
  }, [dateString]);

  return (
     <TableCell className="text-xs text-muted-foreground">
      {formattedDate}
    </TableCell>
  )
}

export function ActivatedUsersCard({ activatedUsers }: ActivatedUsersCardProps) {
  return (
    <Card className="lg:col-span-1">
      <CardHeader>
         <CardTitle className="flex items-center">
          <UserCheck className="mr-2 h-5 w-5 text-green-500" />
          Geactiveerde Accounts
        </CardTitle>
        <CardDescription>Premium gebruikers die een account hebben aangemaakt.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>E-mail</TableHead>
              <TableHead>Laatst Ingelogd (Lokale Tijd)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activatedUsers.length > 0 ? (
              activatedUsers.map(user => (
                <TableRow key={user.email}>
                  <TableCell className="font-medium break-all">{user.email}</TableCell>
                  <FormattedDateCell dateString={user.lastSignInTime} />
                </TableRow>
              ))
            ) : (
               <TableRow>
                <TableCell colSpan={2} className="text-center text-muted-foreground">Geen geactiveerde premium accounts.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
