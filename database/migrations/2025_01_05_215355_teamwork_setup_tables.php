<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;

class TeamworkSetupTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table(Config::get('teamwork.users_table'), function (Blueprint $table) {
            $table->integer('current_team_id')->unsigned()->nullable();
        });

        Schema::create(Config::get('teamwork.teams_table'), function (Blueprint $table) {
            $table->id();
            $table->foreignId('owner_id');
            $table->string('name');
            $table->text('description')->nullable();
            $table->timestamps();
        });

        Schema::create(Config::get('teamwork.team_user_table'), function (Blueprint $table) {
            $table->foreignId('user_id');
            $table->foreignId('team_id');
            $table->timestamps();

            $table->foreign('user_id')
                ->references(Config::get('teamwork.user_foreign_key'))
                ->on(Config::get('teamwork.users_table'))
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreign('team_id')
                ->references('id')
                ->on(Config::get('teamwork.teams_table'))
                ->onDelete('cascade');
        });

        Schema::create(Config::get('teamwork.team_invites_table'), function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->unsigned();
            $table->integer('team_id')->unsigned();
            $table->enum('type', ['invite', 'request']);
            $table->string('email');
            $table->string('accept_token');
            $table->string('deny_token');
            $table->timestamps();
            $table->foreign('team_id')
                ->references('id')
                ->on(Config::get('teamwork.teams_table'))
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table(Config::get('teamwork.users_table'), function (Blueprint $table) {
            $table->dropColumn('current_team_id');
        });

        Schema::table(Config::get('teamwork.team_user_table'), function (Blueprint $table) {
            if (DB::getDriverName() !== 'sqlite') {
                $table->dropForeign(Config::get('teamwork.team_user_table') . '_user_id_foreign');
            }
            if (DB::getDriverName() !== 'sqlite') {
                $table->dropForeign(Config::get('teamwork.team_user_table') . '_team_id_foreign');
            }
        });

        Schema::drop(Config::get('teamwork.team_user_table'));
        Schema::drop(Config::get('teamwork.team_invites_table'));
        Schema::drop(Config::get('teamwork.teams_table'));
    }
}
