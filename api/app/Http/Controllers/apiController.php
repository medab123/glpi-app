<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use function PHPSTORM_META\map;

class apiController extends Controller
{
    public function ticketParEntiter(Request $request)
    {
        $date1 = date('Y/m/d', strtotime($request->input('date1')));
        $date2 = date('Y/m/d', strtotime($request->input('date2')));
        //SELECT glpi_entities.name, count(glpi_tickets.id) FROM glpi_tickets inner join glpi_entities on glpi_entities.id = glpi_tickets.entities_id  GROUP BY glpi_tickets.entities_id;
        $ticketParEntiter = DB::select("SELECT glpi_entities.name as entities, count(glpi_tickets.id) as valeu FROM glpi_tickets inner join glpi_entities on glpi_entities.id = glpi_tickets.entities_id where date between '$date1' and '$date2'  and glpi_entities.id in(15,1,7,21,18,16,2,23,24) GROUP BY glpi_tickets.entities_id;");
        //$ticketParEntiter = [["entity" => "EV maroc","valeu" => 100],["entity" => 'EV fr',"valeu" => 500],["entity" => 'EV sin',"valeu" => 200]];
        $arr = [];
        foreach ($ticketParEntiter as $row) {
            $arr[] = (array) $row;
        }
        return response()->json($arr);
    }
    public function satisfactionByTechnicien(Request $request)
    {
        $date1 = date('Y/m/d', strtotime($request->input('date1')));
        $date2 = date('Y/m/d', strtotime($request->input('date2')));
        $ticketParEntiter = DB::select("select glpi_users.realname,avg(glpi_ticketsatisfactions.satisfaction) as moyenne, avg(glpi_ticketsatisfactions.satisfaction)*20 as percantage from glpi_ticketsatisfactions inner join glpi_tickets on glpi_tickets.id = glpi_ticketsatisfactions.tickets_id inner join glpi_entities on glpi_entities.id = glpi_tickets.entities_id inner join glpi_users on glpi_entities.id = glpi_users.entities_id  where date between '$date1' and '$date2'  and glpi_users.id  in(264,153,93,935,1299 )  and satisfaction is not null GROUP BY glpi_users.id;");
        //$ticketParEntiter = [["entity" => "EV maroc","valeu" => 100],["entity" => 'EV fr',"valeu" => 500],["entity" => 'EV sin',"valeu" => 200]];
        $arr = [];
        foreach ($ticketParEntiter as $row) {
            $arr[] = (array) $row;
        }
        return response()->json($arr);
    }
    public function ticketByTechnicien(Request $request)
    {
        $date1 = date('Y/m/d', strtotime($request->input('date1')));
        $date2 = date('Y/m/d', strtotime($request->input('date2')));
        $ticketParEntiter = DB::select("select glpi_users.realname as technicien,count(glpi_tickets.id) as valeu
        from glpi_tickets
        inner join glpi_entities on glpi_entities.id = glpi_tickets.entities_id
        inner join glpi_users on glpi_entities.id = glpi_users.entities_id
        where date between '$date1' and '$date2'  and glpi_users.id  in(264,153,93,935,1299 )
        GROUP BY glpi_users.id;");
        //$ticketParEntiter = [["technicien" => "mohammed elabidi", "valeu" => 100], ["technicien" => 'oussama', "valeu" => 500], ["technicien" => 'faical', "valeu" => 100]];
        $arr = [];
        foreach ($ticketParEntiter as $row) {
            $arr[] = (array) $row;
        }
        return response()->json($arr);
    }
    public function satisfactionByEntiter(Request $request)
    {
        $date1 = date('Y/m/d', strtotime($request->input('date1')));
        $date2 = date('Y/m/d', strtotime($request->input('date2')));
        $ticketParEntiter = DB::select("select glpi_entities.name ,avg(glpi_ticketsatisfactions.satisfaction) as moyenne from glpi_ticketsatisfactions inner join glpi_tickets on glpi_tickets.id = glpi_ticketsatisfactions.tickets_id inner join glpi_entities on glpi_entities.id = glpi_tickets.entities_id where date between '$date1' and '$date2'  and glpi_entities.id in(15,1,7,21,18,16,2,23,24) and satisfaction is not null GROUP BY glpi_tickets.entities_id;");
        //$ticketParEntiter = [["entity" => "EV maroc","valeu" => 100],["entity" => 'EV fr',"valeu" => 500],["entity" => 'EV sin',"valeu" => 200]];
        $arr = [];
        foreach ($ticketParEntiter as $row) {
            $arr[] = (array) $row;
        }
        return response()->json($arr);
    }
    public function ticketResoluByEntiter(Request $request)
    {
        $date1 = date('Y/m/d', strtotime($request->input('date1')));
        $date2 = date('Y/m/d', strtotime($request->input('date2')));
        $ticketParEntiter = DB::select("SELECT glpi_entities.name, count(solvedate) as nombreTickts FROM glpi_tickets inner join glpi_entities on glpi_entities.id = glpi_tickets.entities_id where date between '$date1' and '$date2'  and  glpi_entities.id in(15,1,7,21,18,16,2,23,24) GROUP BY glpi_tickets.entities_id;");
        //$ticketParEntiter = [["entity" => "EV maroc","valeu" => 100],["entity" => 'EV fr',"valeu" => 500],["entity" => 'EV sin',"valeu" => 200]];
        $arr = [];
        foreach ($ticketParEntiter as $row) {
            $arr[] = (array) $row;
        }
        return response()->json($arr);
    }
    public function totaleTikets(Request $request)
    {
        $date1 = date('Y/m/d', strtotime($request->input('date1')));
        $date2 = date('Y/m/d', strtotime($request->input('date2')));
        $ticketParEntiter = DB::select("select count(glpi_tickets.id) as valeu
        from glpi_tickets
        inner join glpi_entities on glpi_entities.id = glpi_tickets.entities_id
        inner join glpi_users on glpi_entities.id = glpi_users.entities_id
        where date between '$date1' and '$date2'  and glpi_users.id  in(264,153,93,935,1299 )");
        //$ticketParEntiter = [["entity" => "EV maroc","valeu" => 100],["entity" => 'EV fr',"valeu" => 500],["entity" => 'EV sin',"valeu" => 200]];
        $arr = [];
        foreach ($ticketParEntiter as $row) {
            $arr[] = (array) $row;
        }
        return response()->json($arr);
    }
}
